import create from "zustand";

const useGameState = create((set, get) => ({
    // Game State
    selectedWeapon: null,
    hunters: [
      { id: 1, position: [0, 0, 0], weapon: null, action: "idle", health: 100 },
    { id: 2, position: [2, 0, 0], weapon: null, action: "idle", health: 100 },
    ],

    zombies: [{ id: 1, position: [5, 0, 5] }], // Initially, one zombie
  
    // Add a zombie to the state
    addZombie: (zombie) =>
      set((state) => ({ zombies: [...state.zombies, zombie] })),
  
    // Remove a zombie from the state
    removeZombie: (zombieId) =>
      set((state) => ({
        zombies: state.zombies.filter((zombie) => zombie.id !== zombieId),
      })),
  
    // Respawn a zombie after a delay (1-2 minutes)
    respawnZombie: () => {
      const respawnDelay = Math.random() * 60000 + 60000; // 1-2 minutes in milliseconds
      setTimeout(() => {
        const newZombieId = Math.floor(Math.random() * 1000) + 1; // Random unique ID
        const position = [
          Math.random() * 10 - 5, // Random X position (-5 to 5)
          0,
          Math.random() * 10 - 5, // Random Z position (-5 to 5)
        ];
        get().addZombie({ id: newZombieId, position });
      }, respawnDelay);
    },
  
    // Duplicate zombies randomly
    duplicateZombie: () => {
      const zombies = get().zombies;
      if (zombies.length === 0) return;
  
      const zombieToDuplicate = zombies[Math.floor(Math.random() * zombies.length)]; // Pick a random zombie
      const newZombieId = Math.floor(Math.random() * 1000) + 1; // Random unique ID
      const newPosition = [
        zombieToDuplicate.position[0] + Math.random() * 2 - 1, // Slight offset on X
        0,
        zombieToDuplicate.position[2] + Math.random() * 2 - 1, // Slight offset on Z
      ];
  
      get().addZombie({ id: newZombieId, position: newPosition });
    },
  
    // Kill a zombie and handle respawn
    killZombie: (zombieId) => {
      get().removeZombie(zombieId); // Remove the zombie
      get().respawnZombie(); // Respawn after a delay
      if (Math.random() < 0.5) {
        // 50% chance to duplicate a zombie
        get().duplicateZombie();
      }
    },
  
    // Reset game state
    resetGameState: () =>
      set({
        selectedWeapon: null,
        hunters: [
          { id: 1, position: [0, 0, 0], weapon: null, action: "idle", health: 100 },
          { id: 2, position: [2, 0, 0], weapon: null, action: "idle", health: 100 },
        ],
        zombies: [{ id: 1, position: [5, 0, 5] }], // Reset to a single zombie
      }),
  }));
  
  export default useGameState;