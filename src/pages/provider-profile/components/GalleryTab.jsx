import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GalleryTab = ({ provider }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { value: 'all', label: 'All Work', count: provider?.gallery?.length },
    { value: 'before-after', label: 'Before & After', count: provider?.gallery?.filter(item => item?.category === 'before-after')?.length },
    { value: 'completed', label: 'Completed Projects', count: provider?.gallery?.filter(item => item?.category === 'completed')?.length },
    { value: 'in-progress', label: 'Work in Progress', count: provider?.gallery?.filter(item => item?.category === 'in-progress')?.length },
  ];

  const filteredGallery = selectedCategory === 'all' 
    ? provider?.gallery 
    : provider?.gallery?.filter(item => item?.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Stats */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {provider?.portfolioStats?.totalProjects}
            </div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {provider?.portfolioStats?.completedThisMonth}
            </div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {provider?.portfolioStats?.averageRating}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {provider?.portfolioStats?.repeatCustomers}%
            </div>
            <div className="text-sm text-muted-foreground">Repeat Customers</div>
          </div>
        </div>
      </div>
      {/* Category Filters */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-4">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.value}
              onClick={() => setSelectedCategory(category?.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                selectedCategory === category?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category?.label} ({category?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGallery?.map((item, index) => (
          <div key={index} className="bg-card rounded-lg shadow-elevation-sm overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item?.image}
                alt={item?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <button
                  onClick={() => openLightbox(item)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30"
                >
                  <Icon name="Expand" size={20} color="white" />
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                  {item?.category === 'before-after' ? 'Before & After' : 
                   item?.category === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {/* Before/After Indicator */}
              {item?.category === 'before-after' && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {item?.beforeAfter}
                  </span>
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-1">{item?.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  <span>{item?.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={12} />
                  <span>{item?.location}</span>
                </div>
              </div>

              {/* Project Tags */}
              {item?.tags && item?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {item?.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
            
            <Image
              src={selectedImage?.image}
              alt={selectedImage?.imageAlt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 rounded-b-lg">
              <h4 className="font-medium mb-1">{selectedImage?.title}</h4>
              <p className="text-sm opacity-80">{selectedImage?.description}</p>
            </div>
          </div>
        </div>
      )}
      {/* Load More Gallery */}
      {filteredGallery?.length >= 12 && (
        <div className="text-center">
          <button className="px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-smooth">
            Load More Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;