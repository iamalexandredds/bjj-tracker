"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// VERSIONE DI TEST SENZA SUPABASE PER SBLOCCARE LO SCHERMO
export function AddTechniqueDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-white">
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Se vedi questo, il problema era il collegamento con Supabase nel codice precedente.</p>
          <Button onClick={() => onOpenChange(false)} className="mt-4">Chiudi</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
