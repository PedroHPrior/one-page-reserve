export const Footer = () => {
  return (
    <footer className="border-t py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              AP
            </div>
            <span className="font-semibold">Ana Paula Silva</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados
          </p>
          
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold text-primary">Ordo</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
