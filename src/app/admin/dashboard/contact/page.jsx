"use client";
import React, { useEffect, useState } from "react";
import "./form.modules.scss";
import Link from "next/link";
import TableNav from "../../../../components/tableNav/TableNav";
import Modal from "react-modal";
import axios from "axios";
import Loader from "@/components/loader/Loader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Contact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unresolvedCount, setUnresolvedCount] = useState(0);

  const assembleData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/data/contact");
      const reversedData = res.data.reverse();
      setData(reversedData);

      // Count the number of unresolved queries
      const unresolved = res?.data?.filter(
        (item) => item.comment === "Unchecked"
      ).length;
      console.log(unresolved);
      setUnresolvedCount(unresolved);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const assembleDataWrapper = async () => {
      try {
        await assembleData();
      } catch (err) {
        console.log(err);
      }
    };

    assembleDataWrapper();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [expandedUser, setExpandedUser] = useState(null);

  const toggleUserDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e, id) => {
    try {
      e.preventDefault();
      await axios.put("/api/data/contact/single", { id, comment });
      closeModal();
      setExpandedUser(null);
      await assembleData();
    } catch (err) {
      console.log(err);
    } finally {
      setComment("");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this query?")) {
        await axios.delete("/api/data/contact/single", {
          data: { id },
        });
        setExpandedUser(null);
        await assembleData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="usersList">
      <div className="queryBox">
        <div className="query">Total Query: {data.length}</div>
        <div className="query">Unresolved Query: {unresolvedCount}</div>
      </div>
      <div className="box2">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Contact No</th>
              <th>Date</th>
              <th>How did You find us?</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data, index) => (
              <React.Fragment key={index}>
                <tr className={index % 2 === 1 ? "lightgray" : ""}>
                  <td>{startIndex + index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.contact}</td>
                  <td>
                    {new Date(data?.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    , {new Date(data?.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{data.source}</td>
                  <td>{data.comment}</td>
                  <td>
                    <Link href="" onClick={() => toggleUserDetails(index + 1)}>
                      {expandedUser === index + 1 ? "Close" : "More Details"}
                    </Link>
                  </td>
                </tr>
                {expandedUser === index + 1 && (
                  <tr className="expandedRow">
                    <td colSpan="6">
                      <div className="expanded">
                        <div className="col1">
                          <div>
                            <b>Query Time: </b>
                            {new Date(data?.createdAt).toLocaleDateString(
                              undefined,
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                            , {new Date(data?.createdAt).toLocaleTimeString()}
                          </div>
                          <div>
                            <b>Update Time: </b>
                            {new Date(data?.updatedAt).toLocaleDateString(
                              undefined,
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                            , {new Date(data?.updatedAt).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="col2">
                          <div>
                            <b>PIN Code: </b>
                            N/A
                          </div>
                          <div>
                            <b>City: </b>
                            N/A
                          </div>
                          <div
                            onClick={() => handleDelete(data._id)}
                            style={{
                              float: "right",
                              backgroundColor: "red",
                              color: "white",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              marginLeft: "8px",
                              cursor: "pointer",
                            }}
                          >
                            Delete query
                          </div>

                          <div
                            style={{
                              float: "right",
                              backgroundColor: "#d6d6d6",
                              color: "black",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                            onClick={openModal}
                          >
                            Update Comment
                          </div>
                          <Modal
                            isOpen={modalIsOpen}
                            ariaHideApp={false}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                          >
                            <button
                              style={{
                                float: "right",
                                fontSize: "1.4vw",
                                fontWeight: 600,
                              }}
                              onClick={closeModal}
                            >
                              X
                            </button>
                            <br />
                            <div>Enter Comment</div>
                            <form onSubmit={(e) => handleSubmit(e, data._id)}>
                              <input
                                type="text"
                                style={{
                                  width: "300px",
                                  height: "2vw",
                                  paddingLeft: "0.5vw",
                                  border: "none",
                                }}
                                placeholder={data?.comment}
                                autoFocus
                                value={comment}
                                onChange={handleChange}
                              />
                              <br />
                              <br />
                              <button type="submit" style={{ float: "right" }}>
                                Save
                              </button>
                            </form>
                          </Modal>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tableNav">
        <TableNav
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Contact;
