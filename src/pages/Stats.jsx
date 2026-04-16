import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { useTimeline } from '../context/TimelineContext';

const COLORS = {
    Text: '#8B5CF6',
    Call: '#1C4A3B',
    Video: '#10B981',
};

const CustomLegend = ({ payload }) => (
    <div className="flex items-center justify-center gap-5 mt-4">
        {payload.map(entry => (
            <div key={entry.value} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-gray-500">{entry.value}</span>
            </div>
        ))}
    </div>
);

export default function Stats() {
    const { entries } = useTimeline();

    const typeCounts = entries.reduce((acc, e) => {
        if (['Call', 'Text', 'Video'].includes(e.type)) {
            acc[e.type] = (acc[e.type] || 0) + 1;
        }
        return acc;
    }, {});

    const data = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
    const hasData = data.length > 0;

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Friendship Analytics</h1>

                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <p className="text-sm font-medium text-gray-600 mb-4">By Interaction Type</p>

                    {!hasData ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <BarChart2 size={28} className="text-gray-300" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-700 mb-1">Add Interactions to see Analytics</h3>
                            <p className="text-sm text-gray-400 max-w-xs">
                                Visit a friend's page and log a Call, Text, or Video — your stats will appear here.
                            </p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {data.map(entry => (
                                        <Cell key={entry.name} fill={COLORS[entry.name] || '#6B7280'} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }}
                                    formatter={(value, name) => [`${value} interactions`, name]}
                                />
                                <Legend content={<CustomLegend />} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
