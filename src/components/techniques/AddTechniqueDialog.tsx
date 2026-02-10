"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddTechniqueDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuova Tecnica</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nome Tecnica</Label>
            <Input className="bg-zinc-900 border-zinc-800" placeholder="es. Armbar" />
          </div>
          <p className="text-sm text-yellow-500 bg-yellow-500/10 p-3 rounded-md">
            Nota: Il database non è ancora collegato. Questa maschera è solo dimostrativa.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onOpenChange(false)}>
            Chiudi Anteprima
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
