export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  {
    id: "1",
    value: 3,
    suffix: "+",
    label: "Years of Excellence"
  },
  {
    id: "2",
    value: 10,
    suffix: "+",
    label: "Industries served"
  },
  {
    id: "3",
    value: 3,
    suffix: "+",
    label: "Countries & markets"
  },
  {
    id: "4",
    value: 50,
    suffix: "+",
    label: "Projects delivered"
  }
];
