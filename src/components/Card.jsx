const Card = ({ title, timeFrames, activeTab, bgColor, imgSrc, className }) => {
  const bgColorClasses = {
    orange: "bg-orange-300",
    blue: "bg-blue-300",
    pink: "bg-pink-400",
    green: "bg-green-400",
    purple: "bg-purple-700",
    yellow: "bg-yellow-300",
  };

  const previousLabels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  const current = timeFrames[activeTab]?.current ?? 0;
  const previous = timeFrames[activeTab]?.previous ?? 0;
  const previousLabel = previousLabels[activeTab];

  return (
    <div
      className={`flex items-end relative rounded-xl overflow-hidden h-full ${bgColorClasses[bgColor]} ${className}`}
    >
      <img
        src={imgSrc}
        alt={title}
        className="absolute right-4 top-[-0.7rem]"
      />
      <div className="bg-navy-900 w-full z-10 rounded-xl px-6 py-8 flex flex-col gap-1.5 cursor-pointer hover:bg-card-hover transition-all duration-300 lg:py-6">
        <div className="flex items-center justify-between">
          <p className="text-white sm:text-sm">{title}</p>
          <button className="group cursor-pointer hover:bg-navy-800 p-2 rounded">
            <svg
              width="21"
              height="5"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[hsl(236,100%,87%)] group-hover:fill-white transition-colors duration-200"
            >
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-y-2 sm:mt-3.5">
          <h2 className="text-white text-3xl font-light sm:text-4xl lg:text-5xl">
            {current}hrs
          </h2>
          <p className="text-navy-200 text-sm">
            {previousLabel} - {previous}hrs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
