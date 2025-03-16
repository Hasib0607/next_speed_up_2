const SectionHeadingFortyFour = ({ title, title_color }: any) => {
    return (
        <div className="space-y-1">
            <h3
                style={{ color: title_color }}
                className="text-start font-semibold text-lg"
            >
                {title}
            </h3>
            <div
                className="w-full border border-[var(--header-color)] rounded-full"
            ></div>
        </div>
    );
};

export default SectionHeadingFortyFour;
