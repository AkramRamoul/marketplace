import ProductsRow from "./components/ProductsRow";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24 bg-background">
      <div className="mx-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the UI for you</h1>
        <h1 className="text-primary">Template & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          Discover a curated collection of beautifully designed, fully
          responsive Tailwind CSS templates and handcrafted icons. Whether
          you&apos;re building a sleek website, web app, or mobile interface,
          our resources offer modern aesthetics, clean code, and easy
          customization.
        </p>
      </div>
      <ProductsRow category="newest" />
      <ProductsRow category="icon" />
      <ProductsRow category="template" />
      <ProductsRow category="uikit" />
    </section>
  );
}
