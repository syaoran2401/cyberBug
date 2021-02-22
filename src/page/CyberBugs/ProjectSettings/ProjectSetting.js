import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_PROJECT_CATEGORY } from "../../../redux/types/CyberBugsType";
import { jiraCreatProjectAction } from "../../../redux/actions/JiraAction";

function ProjectSetting(props) {
    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory
    );
    const dispatch = useDispatch()


    const renderArrayCategory = () => {
        return arrProjectCategory.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
        })
    }

    // hàm của tiny
    const handleEditorChange = (content, editor) => {
        // setFieldValue => chỉ lấy dữ liệu của trường description. Thay cho hàm handleChange
        // setValue => set 1 object          
        setFieldValue('description', content)
    };

    useEffect(() => {
      dispatch({
          type:GET_ALL_PROJECT_CATEGORY,
      })
    }, [])

    return (
        <div className="container mt-4">
            <div className="text-center ">
                <h1>Create Project</h1>
            </div>
            <form className="container mt-5" onSubmit={handleSubmit} onChange={handleChange}>
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        name="description"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="form-group">
                    <p>Type:</p>
                    <select name="categoryId" className="form-control" onChange={handleChange}>
                        {renderArrayCategory()}
                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">
                    Create Project
        </button>
            </form>
        </div>
    );
}



const projectSettingForm = withFormik({
    // enableReinitialize => mỗi lần redux thay đổi thì sẽ chạy lại hàm projectSettingForm
    enableReinitialize:true,
    mapPropsToValues: (props) =>{
        return{
            projectName:'',
            description:'',
            categoryId:props.arrProjectCategory[0]?.id, 
            // Vì mới đầu load lên thì reducer là rỗng, nên xài toán tử ? => nếu có thì .id ngược lại thì trả về undefined

        }
    },

    validationSchema: Yup.object().shape({
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(jiraCreatProjectAction(values))
    },

    displayName: 'ProjectSettingFormik',
})(ProjectSetting);

const mapStateToProps = state =>{
    return {
        arrProjectCategory : state.ProjectCategoryReducer.arrProjectCategory
    }
}

export default connect(mapStateToProps)(projectSettingForm)
