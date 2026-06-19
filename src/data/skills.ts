export interface ProcessStage {
  label: string;
  // Position coordinates as percentages relative to the central portrait container
  desktopTop: string;
  desktopLeft: string;
  mobileHidden?: boolean;
}

export const processStages: ProcessStage[] = [
  {
    label: 'Idea',
    desktopTop: '5%',
    desktopLeft: '-40%',
  },
  {
    label: 'Research',
    desktopTop: '-5%',
    desktopLeft: '80%',
  },
  {
    label: 'Wireframe',
    desktopTop: '35%',
    desktopLeft: '-60%',
  },
  {
    label: 'Prototype',
    desktopTop: '30%',
    desktopLeft: '110%',
  },
  {
    label: 'Interface',
    desktopTop: '65%',
    desktopLeft: '-55%',
  },
  {
    label: 'Code',
    desktopTop: '55%',
    desktopLeft: '105%',
  },
  {
    label: 'Launch',
    desktopTop: '90%',
    desktopLeft: '-20%',
    mobileHidden: true,
  },
];
