import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlumniList } from '../actions/projectActions';
import { Search, Briefcase, GraduationCap, Mail } from 'lucide-react';

const Alumni = () => {
  const dispatch = useDispatch();
  const { loading, error, alumni } = useSelector((state) => state.alumniList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    graduationYear: '',
    company: '',
  });

  useEffect(() => {
    dispatch(getAlumniList());
  }, [dispatch]);

  const filteredAlumni = alumni?.filter((alum) => {
    const matchesSearch = 
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.skills.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = filters.branch === '' || alum.branch === filters.branch;
    const matchesYear = filters.graduationYear === '' || alum.graduation_year.toString() === filters.graduationYear;
    const matchesCompany = filters.company === '' || alum.company === filters.company;

    return matchesSearch && matchesBranch && matchesYear && matchesCompany;
  });

  const uniqueBranches = [...new Set(alumni?.map(alum => alum.branch))];
  const uniqueYears = [...new Set(alumni?.map(alum => alum.graduation_year))].sort((a, b) => b - a);
  const uniqueCompanies = [...new Set(alumni?.map(alum => alum.company))];

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500">Error: {error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, company, or skills..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Branches</option>
            {uniqueBranches?.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          <select
            value={filters.graduationYear}
            onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {uniqueYears?.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Companies</option>
            {uniqueCompanies?.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni?.map((alumnus) => (
          <div key={alumnus.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{alumnus.name}</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Briefcase size={16} className="mr-2" />
                    <span>{alumnus.current_designation} at {alumnus.company}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <GraduationCap size={16} className="mr-2" />
                    <span>{alumnus.branch} ({alumnus.graduation_year})</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700">Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {alumnus.skills.split(',').map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <a
                  href={`mailto:${alumnus.email}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <Mail size={16} className="mr-1" />
                  Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlumni?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No alumni found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default Alumni;