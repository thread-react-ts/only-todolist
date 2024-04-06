import React from "react";

function CreateArea() {
    return (
        <div>
            <form>
                <input type="title" placeholder="Title" /> 
                <textarea name="content" placeholder="Take a note..." rows={2}/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default CreateArea;