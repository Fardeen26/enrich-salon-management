import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// eslint-disable-next-line react/prop-types
const StateBox = ({ icon, title, value, iconBGColor, currency }) => {
    return (
        <div className="box-1 flex h-full items-center p-4 justify-between">
            <div className="info-text">
                <div className="heading text-lg font-semibold">{title}</div>
                <div className="real-value text-4xl mt-2">{currency ? <CurrencyRupeeIcon /> : ""}{value}</div>
            </div>
            <div className="icon">
                <div className="round-box rounded-full" style={{ padding: '14px', backgroundColor: `${iconBGColor}` }}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default StateBox