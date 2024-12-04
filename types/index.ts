export interface GreetingProps {
  message: string;
}

export type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: object;
};