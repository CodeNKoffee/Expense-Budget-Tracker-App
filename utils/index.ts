import { GreetingProps } from "@/types";

export function getGreeting(): GreetingProps {
  const date: Date = new Date();
  const hours: number = date.getHours();
  if (hours < 12) {
    return { message: 'Good morning' };
  } else if (hours < 18) {
    return { message: 'Good afternoon' };
  } else {
    return { message: 'Good evening' };
  }
}