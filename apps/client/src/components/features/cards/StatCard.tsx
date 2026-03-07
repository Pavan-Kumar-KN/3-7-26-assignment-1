interface StatCardProps {
  title: string
  value: string
  color?: string
}

const StatCard = ({ title, value, color }: StatCardProps) => {
  return (
    <>
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">{title}</p>
      <p className={`text-3xl font-bold ${color ?? ""}`}>{value}</p>
      </div>
   </>
 ) 
}
export default StatCard;