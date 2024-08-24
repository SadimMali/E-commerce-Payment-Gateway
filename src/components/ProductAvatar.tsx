import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductrAvatarProps {
  url: string;
  fallback: string;
}

const ProductAvatar = ({ url, fallback }: ProductrAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={url} alt={fallback} title={fallback}  />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default ProductAvatar;
