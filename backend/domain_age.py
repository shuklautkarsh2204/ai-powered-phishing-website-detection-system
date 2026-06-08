from datetime import datetime
import whois

def get_domain_age(domain_name):
    try:
        record = whois.whois(domain_name)
        creation_date = record.creation_date
        
        if isinstance(creation_date, list):
            creation_date = creation_date[0]
        
        if not creation_date:
            return -1
        
        return (datetime.now() - creation_date).days
    
    except Exception:
        return -1
 
def age_of_domain_feature(domain_name):
    age = get_domain_age(domain_name)
    
    if age == -1:
        return 1 # potentially sus...
    
    if age >= 180:
        return -1 # not sus...
    
    return 1 # potentially sus...
      