import React, { useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function Color() {
    const [colorData, setColorData] = React.useState({
        title: "",
        colorName: ""
    })
    const [colorDataError, setColorDataError] = React.useState({})
    const [arrayData, setArrayData] = React.useState([])
    const [updateId, setUpdateId] = React.useState("")
    let colorArray = [
        { item: "red" },
        { item: "black" },
        { item: "white" },
        { item: "yellow" },
        { item: "green" }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setColorData({ ...colorData, [name]: value }, setColorDataError(validation(name, value)))
    }
    const validation = (name, value) => {
        switch (name) {
            case 'title':
                if (!value) {
                    return 'title requied'
                } else {
                    return ''
                }
            case 'colorName':
                if (!value) {
                    return "colorname requires *"
                } else {
                    return ""
                }
            default:
                break;
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let allErrors = {}
        Object.keys(colorData).forEach(key => {
            const error = validation(key, colorData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setColorDataError(allErrors)
        } else {
            createColor(colorData)
        }
    }

    const createColor = async (colorData) => {
        if (updateId === "") {

            const ans = await axios.post(`https://nameless-lake-28896.herokuapp.com/api/v1/create`, colorData)
            if (ans?.status === 200) {
                setColorData({
                    title: "",
                    colorName: ""
                })
                getListColor()
                toast.success(ans?.data?.message)

            } else {
                toast.error('something went wrong..')
            }
        }
        else {
            const data = await axios({
                method: 'POST',
                url: `https://nameless-lake-28896.herokuapp.com/api/v1/edit/${updateId}`,
                data: colorData
            })
            if (data?.status) {
                setUpdateId("")
                toast.success(data.data.message)
                setColorData({
                    title: "",
                    colorName: ""
                })
                getListColor()
            }
        }
    }

    const getListColor = async () => {
        let ans = await axios.get('https://nameless-lake-28896.herokuapp.com/api/v1/listcolor')
        if (ans?.status === 200) {
            setArrayData(ans?.data?.data)
        }
    }

    const onDelete = async (id) => {
        const data = await axios({
            method: 'POST',
            url: `https://nameless-lake-28896.herokuapp.com/api/v1/delete/${id}`,
        })
        if (data?.status) {
            toast.success(data?.data?.message)
            getListColor()
        }
    }

    const onEdit = async (val, id) => {
        setUpdateId(id)
        setColorData({
            title: val?.title,
            colorName: val?.colorName
        })

    }
    React.useEffect(() => {
        getListColor()
    }, [])

    return (<>
        <div className="container mt-3">
            <form className="mt-5 needs-validation" novalidate>
                <div class="row">
                    <div class="col">
                        <input type="text" name="title" value={colorData?.title} onChange={handleChange} id="validationCustom01" class="form-control" placeholder="Enter input" required />
                        <span className="error">{colorDataError?.title}</span>
                    </div>
                    <div class="col">
                        <select class="form-select" name="colorName" value={colorData?.colorName} onChange={handleChange} aria-label="Default select example" id="validationCustom02" required >
                            <option selected disabled value="">Choose color...</option>
                            {
                                colorArray?.map((val, index) => (
                                    <option style={{ backgroundColor: `${val.item}` }} key={index}>{val.item}</option>
                                ))
                            }
                        </select>
                        <span className="error">{colorDataError?.colorName}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" class="btn btn-primary" onClick={(e) => onSubmit(e)}> Submit </button>
                </div>
            </form>
            <table class="table mt-5">
                <thead >
                    <tr>
                        <th scope="col">sr.no</th>
                        <th scope="col">title</th>
                        <th scope="col">color</th>
                        <th className="d-flex justify-content-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayData?.map((val, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{val.title}</td>
                                <td>{val.colorName}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <button type="button"  class="w-25 m-1 btn btn-danger" onClick={() => onDelete(val?._id)}> Delete </button>
                                        <button type="button" class= " w-25 m-1 btn btn-secondary" onClick={() => onEdit(val, val._id)}> Update </button>
                                    </div> 
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    </>)
}

export default Color;