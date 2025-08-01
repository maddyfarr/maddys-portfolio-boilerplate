// packages/ui/src/components/Card.tsx
export const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg bg-background p-4 shadow-sm text-foreground">
      {children}
    </div>
  );
  
  export const CardHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-2 border-b pb-2 font-semibold">{children}</div>
  );
  
  export const CardBody = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  