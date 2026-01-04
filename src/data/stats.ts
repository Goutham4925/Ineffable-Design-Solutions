export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  {
    id: "1",
    value: 8,
    suffix: "+",
    label: "Years of Excellence"
  },
  {
    id: "2",
    value: 150,
    suffix: "+",
    label: "Projects Delivered"
  },
  {
    id: "3",
    value: 50,
    suffix: "+",
    label: "Global Clients"
  },
  {
    id: "4",
    value: 15,
    suffix: "",
    label: "Industry Awards"
  }
];
