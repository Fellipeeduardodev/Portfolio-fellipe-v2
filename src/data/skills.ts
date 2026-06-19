export interface ProcessStage {
  label: string;
  // Position coordinates as percentages relative to the central portrait container
  desktopTop: string;
  desktopLeft: string;
  mobileHidden?: boolean;
}

export const processStages: ProcessStage[] = [
  {
    label: 'Contato',
    desktopTop: '5%',
    desktopLeft: '-40%',
  },
  {
    label: 'Ideia',
    desktopTop: '-5%',
    desktopLeft: '80%',
  },
  {
    label: 'Protótipo',
    desktopTop: '35%',
    desktopLeft: '-60%',
  },
  {
    label: 'Desenvolvimento',
    desktopTop: '30%',
    desktopLeft: '110%',
  },
  {
    label: 'Lançamento',
    desktopTop: '70%',
    desktopLeft: '-20%',
    mobileHidden: true,
  },
];
