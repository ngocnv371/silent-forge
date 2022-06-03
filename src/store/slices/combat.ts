import { createSlice } from '@reduxjs/toolkit';
import { CharacterCombatStatus } from '../../models/combat';

const BaseStats = {
  criticalChance: 6,
  criticalMultiplier: 200,
  physicalDamage: 1,
};

const initialState: CharacterCombatStatus = {
  addedMaximumLife: 100,
  addedMaximumMana: 100,
  addedArmour: 10,
  addedEvasion: 100,
  addedEnergyShield: 100,

  addedFireResistance: 20,
  addedColdResistance: 20,
  addedLightningResistance: 20,
  addedChaosResistance: 20,

  addedPhysicalDamage: 100,
  addedColdDamage: 0,
  addedLightningDamage: 0,
  addedFireDamage: 0,
  addedChaosDamage: 0,

  increasedPhysicalDamage: 0,
  increasedColdDamage: 0,
  increasedLightningDamage: 0,
  increasedFireDamage: 0,
  increasedChaosDamage: 0,

  increasedCriticalChance: 0,
  increasedCriticalMultiplier: 0,
};

const slice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    tap(state) {
    },
    reset(state) {
    },
  },
});

export const { tap, reset } = slice.actions;

export default slice.reducer;
