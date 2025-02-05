import {
  AttachMoneyRounded,
  BrushRounded,
  ComputerRounded,
  HeadsetMicRounded,
  SvgIconComponent,
} from "@mui/icons-material";

type TSector = {
  key: string;
  name: string;
  icon: SvgIconComponent;
};

export const sectors: TSector[] = [
  {
    key: "digital",
    name: "Digital",
    icon: ComputerRounded,
  },
  {
    key: "creative",
    name: "Criativo",
    icon: BrushRounded,
  },
  {
    key: "finance",
    name: "Financeiro",
    icon: AttachMoneyRounded,
  },
  {
    key: "customer_service",
    name: "Atendimento",
    icon: HeadsetMicRounded,
  },
];
