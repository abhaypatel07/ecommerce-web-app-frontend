import React, { useState } from "react";

export const CategoryForm = ({value,setValue,handleSubmit}) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Category Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
