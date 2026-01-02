interface NewsCardProps {
  date: string;
  title: string;
  image?: string;
  href?: string;
  size?: "small" | "medium" | "large";
}

const NewsCard = ({
  date,
  title,
  image,
  href = "#",
  size = "medium",
}: NewsCardProps) => {
  const sizeClasses = {
    small: "aspect-[4/3]",
    medium: "aspect-[16/10]",
    large: "aspect-[16/9]",
  };

  if (image) {
    return (
      <a
        href={href}
        className="news-card relative block overflow-hidden"
      >
        <div className={`relative ${sizeClasses[size]}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="news-card-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <span className="block text-sm text-primary-foreground/70 mb-1 font-sans">
              {date}
            </span>
            <h3 className="text-lg md:text-xl font-heading font-bold text-primary-foreground leading-tight">
              {title}
            </h3>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="news-card block p-4 md:p-6 bg-secondary hover:bg-secondary/80 transition-colors"
    >
      <span className="block text-sm text-muted-foreground mb-2 font-sans">
        {date}
      </span>
      <h3 className="text-lg md:text-xl font-heading font-bold text-foreground leading-tight">
        {title}
      </h3>
    </a>
  );
};

export default NewsCard;
