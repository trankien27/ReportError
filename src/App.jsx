import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";
import moment from "moment";
function App() {

//test area

const dateNow = new Date(
)
// const formatDate =(date) =>{
// var dateFormat =  date.toLocaleDateString('vi-VN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: '2-digit',
//     hour: 'numeric',
//     minute: '2-digit'
//   });
//   return dateFormat;
// }


//end test area
  const Funs = [
    "Fun 1",
    "Fun 2",
    "Fun 3",
    "Fun 5",
    "Fun 6",
    "Fun 7",
    "Fun 8",
    "Fun 9",
    "Fun 10",
    "Fun 11",
    "Fun 12",
    "string",
  ];
  const [shopValue, setShopValue] = useState(" ");
  const[typeErr,setTypeErr] =useState(" ");
  const[fromDate,setFromDate] = useState(new Date());
  const[toDate,setToDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPage, setNumberPage] = useState();
  const [listErr, setListErr] = useState([]);
  const hanldeCreate = () => toast.success("Wow so easy!");

  const handleClickPage = (index) => {
    setCurrentPage(index);
    
  };

  const handleFilterShop = (e) => {
    setCurrentPage(1);
    setShopValue(e);
  
  };
  const handleFilterTypeErr = (e) => {
    setCurrentPage(1);
    setTypeErr(e);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7156/filter?shop="+
         shopValue+
            "&"+
         "typeError="+typeErr+
         "&pageNumber="+ currentPage+"&pageSize=10"
      );
  console.log(response.data);
      
      setListErr(response.data.items);
      console.log(dayjs(listErr[1].timeReport)
      .format('DD-MM-YYYY HH:mm')
    );
   
  var totalItem =response.data.totalItem;
  var totalPages = (Math.ceil(totalItem / 10));
  console.log((totalItem/10));
  setNumberPage(totalPages);

    } catch (error) {
      console.error("loi khi lay du lieu", error);
    }
  };
  useEffect(() => {
    fetchData();
  
  }, [currentPage,shopValue,typeErr]);
const handleRange =(e)=>{
 setToDate(dayjs(listErr[0].timeReport)
  .format('YYYY-MM-DD'));
  setFromDate(dayjs(listErr[0].timeReport)
  .format('YYYY-MM-DD'));
console.log(toDate,fromDate);

}

  return (
    <>
      <div class="container">
      <DateRangePicker onChange={(e)=>handleRange(e)} className="input-group" ranges={[]} />
        <div class="input-group">
          <label htmlFor="shop">Cửa hàng</label>
          <select
            onChange={(e) => handleFilterShop(e.target.value)}
            placeholder="Cửa hàng"
            value={shopValue}
            className="shop"
          >
            <option value=" ">Cửa hàng</option>
            {Funs.map((fun) => (
              <option value={fun}>{fun}</option>
            ))}
          </select>
        </div>
        <div class="input-group">
          <label htmlFor="typeError">Kiểu lỗi </label>
          <select className="typeError" value={typeErr} onChange={(e)=>handleFilterTypeErr(e.target.value)}>
          <option class="blurred" value=" ">Loại lỗi</option>
            <option value="Bộ nhận tiền">Bộ nhận tiền</option>
            <option value="Máy ảnh">Máy ảnh</option>
          </select>
        </div>
        <div class="btn-add">
          <button onClick={hanldeCreate} class="btn">
            Thêm mới
          </button>
        </div>
      </div>

      <table>
        <thead>
          {}
          <tr>
            <th>Cửa hàng</th>
            <th>Người báo lỗi</th>
            <th>Thời gian báo lỗi</th>
            <th>Loại lỗi</th>
            <th>Người kiểm tra lỗi</th>
            <th>Thông tin chính xác lỗi</th>
            <th>Nguyên nhân</th>
            <th>Cách xử lý</th>
          </tr>
        </thead>
        <tbody>
 

        {listErr.length>0 ? (
  listErr.map((err) => (
    <tr>
      <td>{err.shop}</td>
      <td className="reporter">{err.issueReporter}</td>
      <td className="date">{dayjs(err.timeReport)
      .format('DD-MM-YYYY HH:mm')}</td>
      <td>{err.descriptionError}</td>
      <td>{err.errorChecker}</td>
      <td className="detailErr">{err.errorDetails}</td>
      <td className="causeErr">{err.rootCause}</td>
      <td className="solutionErr">{err.solution}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="8">Không có dữ liệu</td>
  </tr>
)}
   
        </tbody>
      </table>

            <ReactPaginate className="pagination"
            prevRel={null}
          //  onPageActive={()}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e)=>handleClickPage(e.selected+1)}
        pageRangeDisplayed={5}
        pageCount={numberPage}
              activeClassName="active"
                       pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
        previousLabel="< previous"
        renderOnZeroPageCount={()=>console.log("0") }
      />
    </>
  );
}

export default App;
