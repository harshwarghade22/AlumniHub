import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlumniRecommendations } from '../actions/projectActions';
import { Briefcase, GraduationCap, Mail, Star, Users, Check, ChevronDown, X } from 'lucide-react';

const AlumniRecommendations = () => {
  const dispatch = useDispatch();
  const { loading, error, recommendations, similarityScores } = useSelector(
    (state) => state.alumniRecommendations
  );
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getAlumniRecommendations());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSkillsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMatchPercentage = (index) => {
    if (!similarityScores?.[index]) return 0;
    return Math.round(similarityScores[index] * 100);
  };
  const filteredRecommendations = recommendations?.filter((alumni, index) => {
    const matchScore = getMatchPercentage(index);
    if (matchScore === 0) return false;

    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedSkills.length === 0) return matchesSearch;
    
    const alumniSkills = alumni.skills.split(',').map(skill => skill.trim().toLowerCase());
    return matchesSearch && selectedSkills.every(skill => 
      alumniSkills.includes(skill.toLowerCase())
    );
  });

  const getAllSkills = () => {
    const skillSet = new Set();
    recommendations?.forEach(alumni => {
      alumni.skills.split(',').forEach(skill => {
        skillSet.add(skill.trim());
      });
    });
    return Array.from(skillSet);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const filteredSkills = getAllSkills().filter(skill =>
    skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Recommended Alumni</h1>
        <p className="text-gray-600">Based on your skills and interests</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, company, or skills..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 relative" ref={dropdownRef}>
            <div
              className="w-full px-4 py-2 border rounded-lg bg-white cursor-pointer flex items-center justify-between"
              onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
            >
              <div className="flex flex-wrap gap-2 flex-1 min-h-[28px]">
                {selectedSkills.length > 0 ? (
                  selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
                    >
                      {skill}
                      <X
                        size={14}
                        className="ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(skill);
                        }}
                      />
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Select skills...</span>
                )}
              </div>
              <ChevronDown
                size={20}
                className={`ml-2 text-gray-500 transform transition-transform ${
                  isSkillsDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </div>

            {isSkillsDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="sticky top-0 bg-white p-2 border-b">
                  <input
                    type="text"
                    placeholder="Search skills..."
                    className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={skillSearchTerm}
                    onChange={(e) => setSkillSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="p-2">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      onClick={() => toggleSkill(skill)}
                    >
                      <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                        selectedSkills.includes(skill) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                      }`}>
                        {selectedSkills.includes(skill) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      {skill}
                    </div>
                  ))}
                  {filteredSkills.length === 0 && (
                    <div className="px-3 py-2 text-gray-500">
                      No skills found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations?.map((alumni, index) => (
          <div key={alumni.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{alumni.name}</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Briefcase size={16} className="mr-2" />
                    <span>{alumni.current_designation} at {alumni.company}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <GraduationCap size={16} className="mr-2" />
                    <span>{alumni.branch} ({alumni.graduation_year})</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    <Star size={16} className="mr-1" />
                    <span>{getMatchPercentage(index)}% Match</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.split(',').map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  onClick={() => window.open(`mailto:${alumni.email}`)}
                >
                  <Mail size={16} className="mr-1" />
                  Contact
                </button>
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <Users size={16} className="mr-1" />
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecommendations?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No recommendations found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default AlumniRecommendations;