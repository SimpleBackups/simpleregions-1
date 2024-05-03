import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jsonToPhpArray } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const data = await getData();

  return (
    <main className="grid grid-cols-8 gap-20">
      <aside className="relative col-span-2 border-r pt-10 ">
        <menu className=" sticky top-10 space-y-2">
          {Object.keys(data).map((provider) => (
            <li className="  text-lg " key={provider}>
              <Link href={`#${provider.toLowerCase()}`}>
                {provider}
              </Link>
            </li>
          ))}
        </menu>
      </aside>
      <article className="prose xl:prose-xl lg:prose-lg col-span-6 w-full pt-10">
        <h2>Cloud Provider Regions</h2>
        {Object.keys(data).map((provider) => (
          <section key={provider}>
            <h3 id={provider.toLowerCase()}>{provider}</h3>
            <ul>
              {Object.keys(data[provider]).map((section) =>
                data[provider][section] === null ? null : (
                  <li key={section} id={section.toLowerCase()}>
                    <h4
                      id={`${provider.toLowerCase()}_${section.toLowerCase()}`}
                    >
                      {provider} {section} Regions
                    </h4>
                    <Tabs defaultValue="json">
                      <TabsList>
                        <TabsTrigger value="json">JSON</TabsTrigger>
                        <TabsTrigger value="php">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="json">
                        <pre className="w-full">
                          {JSON.stringify(data[provider][section], null, 4)}
                        </pre>
                      </TabsContent>
                      <TabsContent value="php">
                        <pre className="w-full">
                          {jsonToPhpArray(
                            JSON.stringify(data[provider][section])
                          )}
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </li>
                )
              )}
            </ul>
          </section>
        ))}
      </article>
    </main>
  );
}

async function getData() {
  const regions = await fetch("https://providers-endpoints.vercel.app/", {
    next: { revalidate: 600 },
  });
  const data = await regions.json();
  return data;
}
