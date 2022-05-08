import './Trip.css'

export const Trip = ({trip}) => {
    let {
        variant,title,description,date,transport
    } = trip
    return (
    <div className="trip-card w-1/4 rounded-lg bg-sky-200 dark:bg-sky-900 border-4 border-sky-600">
        <img src="https://picsum.photos/200"/>
        <h2> {title} </h2>
        <p className="text-lg m-2"> {description} </p>
        <div className="flex justify-center">
            <div className="trip-date border-solid border-2 bg-sky-500 border-sky-500 rounded-lg">
                {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.`}
            </div>
            <div className="flex justify-center trip-transport bg-sky-500 border-solid border-2 border-sky-500 rounded-lg">
                {
                transport.map((t)=>{
                    return <p className="transport-item"> {t} </p>;
                })
                }
            </div>
        </div>
    </div>
    );
}