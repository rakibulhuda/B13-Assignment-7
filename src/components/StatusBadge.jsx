export default function StatusBadge({ status }) {
    const config = {
        overdue: { label: 'Overdue', className: 'bg-red-500 text-white' },
        'almost-due': { label: 'Almost Due', className: 'bg-amber-400 text-white' },
        'on-track': { label: 'On-Track', className: 'bg-emerald-500 text-white' },
    };

    const { label, className } = config[status] || config['on-track'];

    return (
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
    );
}
