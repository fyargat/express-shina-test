export type PickPointId = number;
export type BudgetValue = string;
export type LatitudeType = number;
export type LongitudeType = number;

export type CoordsType = [LatitudeType, LongitudeType];

export interface IPickPoint {
  id: PickPointId;
  address: string;
  budgets: BudgetValue[];
  latitude: LatitudeType;
  longitude: LongitudeType;
}
