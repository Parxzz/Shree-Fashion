export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-background/70">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
        <div>
          <h3 className="font-semibold text-foreground">Shree Fashion</h3>
          <p className="mt-2 max-w-sm">
            Elegant styles for women and accessories. Minimal, modern, and made
            with love.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Contact</h4>
          <ul className="mt-2 space-y-1">
            <li>Email: support@shreefashion.example</li>
            <li>Instagram: @shreefashion</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Legal</h4>
          <p className="mt-2">
            Images shown are placeholders for prototyping. Replace with licensed
            assets before production.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shree Fashion. All rights reserved.
      </div>
    </footer>
  );
}
