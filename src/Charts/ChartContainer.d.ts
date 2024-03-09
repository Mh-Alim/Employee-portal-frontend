import { ElementType } from 'react';

// Define props interface
interface ChartProps {
  datasource: Record<string, any>;
  pan?: boolean;
  zoom?: boolean;
  zoomoutLimit?: number;
  zoominLimit?: number;
  containerClass?: string;
  chartClass?: string;
  NodeTemplate?: ElementType;
  draggable?: boolean;
  collapsible?: boolean;
  multipleSelect?: boolean;
  onClickNode?: () => void;
  onClickChart?: () => void;
}

// Declare ChartContainer component
declare const ChartContainer: React.ForwardRefExoticComponent<
  ChartProps & React.RefAttributes<any>
>;

// Export ChartContainer component
export default ChartContainer;
