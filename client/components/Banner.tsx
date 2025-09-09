import { Button } from "@/components/ui/button";
import { useGsapBanner } from "@/hooks/useGsapBanner";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  useGsapBanner("#heroImg");
  const navigate = useNavigate();

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2"
        style={{ padding: "92px 16px 96px" }}
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-rose-600">
            New Season
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
            Elegance in Every Stitch
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Discover curated women collections and accessories. Minimal design,
            elevated tailoring, and effortless silhouettes.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate("/shop")}>Shop Women</Button>
            <Button
              variant="outline"
              onClick={() => navigate("/shop?category=accessories")}
            >
              Accessories
            </Button>
          </div>
        </div>
        <div className="relative">
          <div
            id="heroImg"
            className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-rose-50 shadow-xl ring-1 ring-border"
          >
            <img
              src="https://images.pexels.com/photos/33772495/pexels-photo-33772495.jpeg"
              alt="Shree Fashion hero"
              className="h-full w-full object-cover"
              loading="lazy"
              style={{ marginTop: -2 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
