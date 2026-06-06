library(foreign)

data <- read.arff("Training Dataset.arff")

write.csv(
  data,
  "phishing.csv",
  row.names = FALSE
)
