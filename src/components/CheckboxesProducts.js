import React from 'react'

export default function CheckboxesProducts({ handlegender, checked }) {

    return (
        <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title collapse-filters font-['Open_Sans']">
                <h3 className='text-center md:text-xs lg:text-base'>Open Filters</h3>
            </div>
            <div className="collapse-content collapse-filters-content font-['Open_Sans']">
                <form className='flex flex-col p-2 items-center'>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text text-white mr-2">All products</span>
                            {checked == "all" ?
                                <input type="radio" name="filter" value="all" className="radio checked:bg-green-500" checked onChange={handlegender} />
                                :
                                <input type="radio" name="filter" value="all" className="radio checked:bg-green-500" onChange={handlegender} />
                            }
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text text-white mr-2">New products</span>
                            {checked == "new" ?
                                <input type="radio" name="filter" value="new" className="radio checked:bg-blue-500" checked onChange={handlegender} />
                                :
                                <input type="radio" name="filter" value="new" className="radio checked:bg-blue-500" onChange={handlegender} />
                            }
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text text-white mr-2">Latest products</span>
                            {checked == "latest" ?
                                <input type="radio" name="filter" value="latest" className="radio checked:bg-red-500" checked onChange={handlegender} />
                                :
                                <input type="radio" name="filter" value="latest" className="radio checked:bg-red-500" onChange={handlegender} />
                            }
                        </label>
                    </div>
                </form>
            </div>
        </div>

    )
}
