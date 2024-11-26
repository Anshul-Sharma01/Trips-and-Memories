import { useDispatch, useSelector } from "react-redux";
import { fetchUserTripJournalsThunk } from "../../Redux/Slices/tripJournalSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import TripJournal from "../../Components/journal/TripJournal";

function MyJournals(){

    const dispatch = useDispatch();
    
    async function fetchMyJournals(){
        const res = await dispatch(fetchUserTripJournalsThunk());
        console.log("Users trips journals : ", res);
    }
    
    useEffect(() => {
        fetchMyJournals();
        console.log("USers journals array : ", usersJournals);
    }, [])

    const usersJournals = useSelector((state) => state?.tripJournal?.usersJournals);

    console.log("----->>", usersJournals);
    
    return(
        <>
            {
                usersJournals.length > 0 ? (
                    usersJournals?.map((ele) => {
                        return <TripJournal
                            key={ele?._id}
                            journalOpen={ele?.status == "open" ? true : false}
                            journalTitle={ele?.title}
                            journalDesc={ele?.description}
                            journalEntries={ele?.entries?.length}
                            journalId={ele?._id}
                        />
                    })
                ) : (
                    usersJournals.length == 0 && (
                        <section className="flex flex-col justify-center items-center h-[90vh] gap-4">
                            <p className="text-center text-4xl ">You don't have any trip journals yet !!</p>
                            <Link to="/create-journal" className=" bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2 ">
                                Create Journal
                            </Link>
                        </section>
                    )

                )
            }

        </>
    )
}


export default MyJournals;

