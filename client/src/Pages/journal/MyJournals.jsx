import { useDispatch, useSelector } from "react-redux";
import { fetchUserTripJournalsThunk } from "../../Redux/Slices/tripJournalSlice";
import { useEffect } from "react";
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
            }
        </>
    )
}


export default MyJournals;

