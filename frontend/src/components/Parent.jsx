import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { FaHome, FaTimes, FaBars } from "react-icons/fa"; // Importing React Icons

const navigation = [
  { name: "Dashboard", href: "/", icon: FaHome, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Parent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // const navigate = useNavigate();

  const renderSidebarContent = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
      <div className="flex h-16 shrink-0 items-center">
        <Link to="/" className="flex items-center">
          {/* <picture className="block">
            <img
              
              alt="Logo"
              className="h-14 w-14 object-contain"
              loading="eager"
              decoding="async"
            />
          </picture> */}
          {/* <span className="h-8 w-px bg-gray-500 mx-2"></span> */}
          <span className="text-lg font-medium text-[#389ee8]">Air Meter</span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name} id={item.name.toLowerCase()}>
                  <Link
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-50 text-blue-500"
                        : "text-gray-700 hover:text-blue-500 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        location.pathname === item.href
                          ? "text-blue-500"
                          : "text-gray-400 group-hover:text-blue-500",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <div>
        {/* Sidebar toggle */}
        <div
          className={`lg:hidden fixed inset-0 bg-gray-900/80 ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 flex ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="w-full max-w-xs flex-1">
            <div className="absolute top-0 right-0 p-5">
              <button
                type="button"
                className="text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            {renderSidebarContent()}
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
          {renderSidebarContent()}
        </div>

        <div className="lg:pl-60">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 justify-end self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <main className="py-10 bg-red-200">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Parent;
