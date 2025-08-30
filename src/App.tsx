import './App.css'
import CourseList from './components/CourseList/CourseList'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { CourseProps } from './types/TypesProps'
import Cart from './Cart/Cart'
import { ToastContainer } from 'react-toastify'

function App() {
  const [courseList, setCourseList] = useState<CourseProps[]>([])

  const fetchCourseList = async () => {
    const response = await fetch("./courses.json");
    const courses = await response.json()
    setCourseList(courses)
  }

  useEffect(() => {
    fetchCourseList()
  }, [])
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/courses" element={<CourseList courseList={courseList} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
