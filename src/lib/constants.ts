// BJJ Technique Categories - Complete list from user
export const TECHNIQUE_CATEGORIES = [
  { value: "takedowns", label: "Takedowns", description: "Tecniche per portare l'avversario dalla posizione eretta a terra" },
  { value: "closed_guard", label: "Guardia Chiusa", description: "Posizione fondamentale di controllo e attacco da sotto" },
  { value: "open_guard", label: "Guardia Aperta", description: "Tecniche di controllo a distanza con piedi e gambe" },
  { value: "half_guard", label: "Mezza Guardia", description: "Posizioni di controllo e transizione" },
  { value: "mount", label: "Montada (Mount)", description: "Posizione dominante da sopra" },
  { value: "side_control", label: "Controllo Laterale (Side Control)", description: "Posizione di controllo a terra essenziale" },
  { value: "knee_on_belly", label: "Ginocchio sullo Stomaco", description: "Posizione di transizione e pressione" },
  { value: "back_take", label: "Presa della Schiena (Back Take)", description: "Posizione di controllo dominante strategica" },
  { value: "guard_pass", label: "Passaggio di Guardia (Guard Pass)", description: "Tecniche per superare le gambe dell'avversario" },
  { value: "sweeps", label: "Ribaltamenti (Sweeps)", description: "Tecniche dalla guardia per invertire la posizione" },
  { value: "armlocks", label: "Sottomissioni (Armlocks)", description: "Finalizzazioni alle articolazioni di gomito e spalla" },
  { value: "leglocks", label: "Sottomissioni (Leglocks)", description: "Attacchi a caviglie, ginocchia e talloni" },
  { value: "chokes", label: "Strangolamenti (Chokes)", description: "Tecniche che interrompono flusso sanguigno o aria" },
  { value: "escapes", label: "Fughe e Difese (Escapes)", description: "Tecniche per uscire da posizioni svantaggiose" },
  { value: "advanced", label: "Tecniche Avanzate", description: "Berimbolo, Worm Guard, Truck, Matrix" },
  { value: "grip_fighting", label: "Grip Fighting", description: "Concetti di grip durante le lotte" },
  { value: "transitions", label: "Transizioni (Transitions)", description: "Cambi di posizione e direzione" },
  { value: "control_retention", label: "Control Retention", description: "Mantenimento delle posizioni dominanti" },
  { value: "guard_retention", label: "Guard Retention", description: "Hip escape, granby, inversioni defensive" },
  { value: "standing_to_ground", label: "Standing to Ground Transitions", description: "Transizioni dalla posizione eretta" },
  { value: "de_la_riva", label: "De La Riva", description: "Hook attorno alla gamba per controllo e squilibrio" },
  { value: "reverse_dlr", label: "Reverse DLR", description: "Presa rovesciata rispetto alla DLR standard" },
  { value: "single_leg_x", label: "Single Leg X", description: "Controllo gamba singola per sweep e sottomissioni" },
  { value: "x_guard", label: "X-Guard", description: "Efficace per sbilanciare e ribaltare" },
  { value: "k_guard", label: "K-Guard", description: "Combinazione di hook e prese per attacchi" },
  { value: "fifty_fifty", label: "50/50", description: "Posizione con gambe intrecciate simmetricamente" },
  { value: "worm_guard", label: "Worm Guard", description: "Utilizzo del bavero per sweep e back takes" },
  { value: "lasso_guard", label: "Lasso Guard", description: "Controllo forte di un braccio avversario" },
  { value: "bodylock_passing", label: "Bodylock Passing System", description: "Blocco del corpo per superare le gambe" },
  { value: "leg_pummeling", label: "Leg Pummeling (No-Gi)", description: "Controllo spazio interno delle gambe" },
  { value: "wrestling_scrambles", label: "Wrestling Scrambles", description: "Granby, switch, peek-out, turtle retention" },
] as const;

// Belt levels with colors
export const BELT_LEVELS = [
  { value: "bianca", label: "Bianca", color: "white", stripes: [0, 1, 2, 3, 4] },
  { value: "blu", label: "Blu", color: "blue", stripes: [0, 1, 2, 3, 4] },
  { value: "viola", label: "Viola", color: "purple", stripes: [0, 1, 2, 3, 4] },
  { value: "marrone", label: "Marrone", color: "brown", stripes: [0, 1, 2, 3, 4] },
  { value: "nera", label: "Nera", color: "black", stripes: [0, 1, 2, 3, 4, 5, 6] },
] as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Principiante", color: "success" },
  { value: "intermediate", label: "Intermedio", color: "warning" },
  { value: "advanced", label: "Avanzato", color: "destructive" },
] as const;

// Training modes
export const TRAINING_MODES = [
  { value: "gi", label: "Gi" },
  { value: "nogi", label: "No-Gi" },
  { value: "both", label: "Entrambi" },
] as const;

// Training types
export const TRAINING_TYPES = [
  { value: "technique", label: "Tecnica", icon: "BookOpen" },
  { value: "sparring", label: "Sparring", icon: "Swords" },
  { value: "drill", label: "Drill", icon: "RotateCcw" },
  { value: "conditioning", label: "Forza & Condizionamento", icon: "Dumbbell" },
] as const;

// Goal status
export const GOAL_STATUS = [
  { value: "active", label: "Attivo", color: "primary" },
  { value: "completed", label: "Completato", color: "success" },
  { value: "paused", label: "In Pausa", color: "muted" },
] as const;

// Goal priority
export const GOAL_PRIORITY = [
  { value: "low", label: "Bassa", color: "muted" },
  { value: "medium", label: "Media", color: "warning" },
  { value: "high", label: "Alta", color: "destructive" },
] as const;

// User roles
export const USER_ROLES = [
  { value: "practitioner", label: "Praticante", description: "Traccia i tuoi allenamenti e progressi" },
  { value: "coach", label: "Coach", description: "Gestisci studenti e assegna obiettivi" },
] as const;

export type TechniqueCategory = typeof TECHNIQUE_CATEGORIES[number]["value"];
export type BeltLevel = typeof BELT_LEVELS[number]["value"];
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number]["value"];
export type TrainingMode = typeof TRAINING_MODES[number]["value"];
export type TrainingType = typeof TRAINING_TYPES[number]["value"];
export type GoalStatus = typeof GOAL_STATUS[number]["value"];
export type GoalPriority = typeof GOAL_PRIORITY[number]["value"];
export type UserRole = typeof USER_ROLES[number]["value"];
