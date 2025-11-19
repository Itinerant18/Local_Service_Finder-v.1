import React from 'react';
import Icon from '../../../components/AppIcon';

const ServicesTab = ({ provider }) => {
  return (
    <div className="space-y-6">
      {/* Service Categories */}
      {provider?.services?.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card rounded-lg shadow-elevation-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={category?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{category?.name}</h3>
              <p className="text-sm text-muted-foreground">{category?.description}</p>
            </div>
          </div>

          {/* Service Items */}
          <div className="space-y-4">
            {category?.items?.map((service, serviceIndex) => (
              <div key={serviceIndex} className="border border-border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{service?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{service?.description}</p>
                    
                    {/* Service Features */}
                    <div className="flex flex-wrap gap-2">
                      {service?.features?.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                        >
                          <Icon name="Check" size={12} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">₹{service?.price}</div>
                    <div className="text-sm text-muted-foreground">{service?.unit}</div>
                    {service?.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{service?.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration and Additional Info */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{service?.duration}</span>
                  </div>
                  {service?.warranty && (
                    <div className="flex items-center gap-1">
                      <Icon name="Shield" size={14} />
                      <span>{service?.warranty} warranty</span>
                    </div>
                  )}
                  {service?.materials && (
                    <div className="flex items-center gap-1">
                      <Icon name="Package" size={14} />
                      <span>Materials {service?.materials}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Package Deals */}
      {provider?.packages && provider?.packages?.length > 0 && (
        <div className="bg-card rounded-lg shadow-elevation-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Package Deals</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {provider?.packages?.map((pkg, index) => (
              <div key={index} className="border border-border rounded-lg p-4 relative">
                {pkg?.popular && (
                  <div className="absolute -top-2 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-3">
                  <h4 className="font-medium text-foreground">{pkg?.name}</h4>
                  <p className="text-sm text-muted-foreground">{pkg?.description}</p>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground">₹{pkg?.price}</span>
                    {pkg?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{pkg?.originalPrice}
                      </span>
                    )}
                    {pkg?.savings && (
                      <span className="text-sm text-success font-medium">
                        Save ₹{pkg?.savings}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {pkg?.includes?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;