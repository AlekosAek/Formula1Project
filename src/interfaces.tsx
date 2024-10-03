export interface IButton {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface IDriver{
  name:string;
  id:number;
  image:string;
  style?: string;

}