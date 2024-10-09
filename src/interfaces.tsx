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

export interface IDriverInfo{
  broadcastName:string;
  fullName:string
  img:string;
  id:number;
  country_code:string;
  nameAcro:string;
  teamColour:string;
  teamName:string
}