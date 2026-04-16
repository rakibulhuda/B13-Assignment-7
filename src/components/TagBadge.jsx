const tagColors = {
    WORK: 'bg-sky-100 text-sky-700',
    FAMILY: 'bg-green-100 text-green-700',
    HOBBY: 'bg-purple-100 text-purple-700',
    TRAVEL: 'bg-orange-100 text-orange-700',
    DEFAULT: 'bg-gray-100 text-gray-600',
};

export default function TagBadge({ tag }) {
    const className = tagColors[tag] || tagColors.DEFAULT;
    return (
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${className}`}>
      {tag}
    </span>
    );
}
