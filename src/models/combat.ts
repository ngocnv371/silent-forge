export interface CharacterCombatStatus {
  addedMaximumLife: number;
  addedMaximumMana: number;
  addedArmour: number;
  addedEvasion: number;
  addedEnergyShield: number;

  addedFireResistance: number;
  addedColdResistance: number;
  addedLightningResistance: number;
  addedChaosResistance: number;

  addedPhysicalDamage: number;
  addedColdDamage: number;
  addedLightningDamage: number;
  addedFireDamage: number;
  addedChaosDamage: number;

  increasedPhysicalDamage: number;
  increasedColdDamage: number;
  increasedLightningDamage: number;
  increasedFireDamage: number;
  increasedChaosDamage: number;

  increasedCriticalChance: number;
  increasedCriticalMultiplier: number;
}

export interface Damage {
  physical: number;
  cold: number;
  lightning: number;
  fire: number;
  chaos: number;
}

export function applyDirectDamage(damage: number, life: number) {
  console.log(`takes ${damage} damage`)
  return life - damage;
}

export function applyResistanceDamage(damage: number, resistance: number, life: number) {
  const effectiveDamageModifier = (100 - resistance)
  console.log(`effective damage modifier: ${effectiveDamageModifier}%`)
  const affectiveDamage = damage * effectiveDamageModifier / 100;
  console.log(`takes ${affectiveDamage} damage`)
  return life - Math.floor(affectiveDamage);
}

export function getAttackDamage(status: CharacterCombatStatus): Damage {
  const physical = status.addedPhysicalDamage * (1 + 0.1 * status.increasedPhysicalDamage);
  const cold = status.addedColdDamage * (1 + 0.1 * status.increasedColdDamage);
  const fire = status.addedFireDamage * (1 + 0.1 * status.increasedFireDamage);
  const lightning = status.addedLightningDamage * (1 + 0.1 * status.increasedLightningDamage);
  const chaos = status.addedChaosDamage * (1 + 0.1 * status.increasedChaosDamage);
  return {
    physical,
    cold,
    lightning,
    chaos,
    fire,
  };
}

export function applyDamage(damage: Damage, life: number, status: CharacterCombatStatus) {
  let newLife = life;
  const physical = damage.physical - status.addedArmour;
  newLife = applyDirectDamage(physical, newLife);

  newLife = applyResistanceDamage(damage.cold, status.addedColdResistance, newLife);
  newLife = applyResistanceDamage(damage.lightning, status.addedLightningResistance, newLife);
  newLife = applyResistanceDamage(damage.fire, status.addedFireResistance, newLife);
  newLife = applyResistanceDamage(damage.chaos, status.addedChaosResistance, newLife);

  return newLife;
}
