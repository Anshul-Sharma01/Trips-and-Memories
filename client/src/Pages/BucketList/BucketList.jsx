import { useDispatch, useSelector } from "react-redux";
import NavigationLayout from "../../Layouts/NavigationLayout";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import { useEffect, useState } from "react";
import MemoryCard from "../../Components/Memory/MemoryCard";
import { getBucketListThunk } from "../../Redux/Slices/bucketListSlice";

function BucketList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth?.userData);

    const [ bucketListData, setBucketListData ] = useState({ fullBucketList : [], totalPages : 1 });
    const [ limit ] = useState(6);
    const [ page, setPage ] = useState(1);
    
    useEffect(() => {
        async function fetchBucketListItems(){
            const res = await dispatch(getBucketListThunk());
            setBucketListData(res?.payload?.data || { fullBucketList : [], totalPages : 1 })
            console.log(bucketListData);
        }
        fetchBucketListItems();

    }, [dispatch, page, limit]);

    return(
        <NavigationLayout>
            <div className="container min-h-screen w-full flex flex-col justify-center items-center gap-4 mx-auto p-4 pb-8 bg-white dark:bg-gray-900">
                <BackButton/>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        <span className="capitalize">{userData?.name}'s </span>
                        Bucket List
                    </h1>
                    <p>Explore Your Bucket List</p>
                </div>
                
                <div className="flex justify-center">
                    <div className="flex flex-wrap gap-6 max-w-6xl justify-center">
                        {
                            bucketListData?.length > 0 ? (
                                bucketListData.map(memory => (
                                    <MemoryCard
                                        key={memory._id}
                                        memory={memory.memory}
                                        className="flex-none w-80"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400 text-center col-span-full">
                                    No Items found in Bucket List
                                </p>
                            )
                        }
                    </div>
                </div>

                <div className="flex justify-center items-center mt-10 space-x-4">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-6 py-2 text-white rounded-md shadow-md ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setPage(prev => Math.min(prev + 1, bucketListData.totalPages))}
                        disabled={page === bucketListData.totalPages}
                        className={`px-6 py-2 text-white rounded-md shadow-md ${page === bucketListData.totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </NavigationLayout>
    )
}

export default BucketList;
