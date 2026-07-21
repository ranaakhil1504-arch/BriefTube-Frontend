import Button from "../ui/Button";

export default function BrowseButton({ onClick }) {
  return (
    <Button size="lg" onClick={onClick}>
      Choose File
    </Button>
  );
}